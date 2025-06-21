/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Stripe from 'stripe'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import { CartProductType } from '@/app/product/[productId]/ProductDetails'
import { getCurrentUser } from '@/actions/getCurrentUser'

// Create Stripe instance with secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

// Calculate total order amount based on items
const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity // fixed: use item.price, not items.price
    return acc + itemTotal
  }, 0)

  const price: any = Math.floor(totalPrice)

  return price
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { items, payment_intent_id } = body

  // Calculate total amount in cents (Stripe expects amount in smallest currency unit)
  const total = calculateOrderAmount(items) * 100

  // Base order data to store in DB
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: 'usd',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id, // use consistent naming
products: JSON.stringify(items),
  }

  if (payment_intent_id) {
    // Retrieve existing payment intent from Stripe
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

    if (current_intent) {
      // Update the amount on existing payment intent if needed
      const updated_intent = await stripe.paymentIntents.update(payment_intent_id, { amount: total })

      // Find existing order and update it in the database
      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentId: payment_intent_id },
      })

      if (!existing_order) {
        return NextResponse.json({ error: 'Invalid Payment Intent' }, { status: 400 })
      }

      const update_order = await prisma.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: {
          amount: total,
          products: items,
        },
      })

      // Return updated payment intent info
      return NextResponse.json({ paymentIntent: updated_intent })
    } else {
      return NextResponse.json({ error: 'Payment Intent not found' }, { status: 404 })
    }
  } else {
    // Create a new payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    // Add paymentIntentId to orderData
    orderData.paymentIntentId = paymentIntent.id

    // Create order in the database
    await prisma.order.create({
      data: orderData,
    })

    // Return the new payment intent
    return NextResponse.json({ paymentIntent })
  }
}
