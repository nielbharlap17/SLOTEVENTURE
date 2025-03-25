'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import { revalidatePath } from 'next/cache'

// Friend management
export async function sendFriendRequest({
  fromUserId,
  toUserId,
}: {
  fromUserId: string
  toUserId: string
}) {
  try {
    await connectToDatabase()

    // Check if request already exists
    const existingRequest = await User.findOne({
      _id: toUserId,
      'friendRequests.from': fromUserId,
    })

    if (existingRequest) {
      return { success: false, message: 'Friend request already sent' }
    }

    // Add friend request
    await User.findByIdAndUpdate(toUserId, {
      $push: { friendRequests: { from: fromUserId, createdAt: new Date() } },
    })

    return { success: true, message: 'Friend request sent successfully' }
  } catch (error) {
    console.error('Error sending friend request:', error)
    return { success: false, message: 'Failed to send friend request' }
  }
}

export async function respondToFriendRequest({
  userId,
  requestFromId,
  accept,
}: {
  userId: string
  requestFromId: string
  accept: boolean
}) {
  try {
    await connectToDatabase()

    // Remove the friend request
    await User.findByIdAndUpdate(userId, {
      $pull: { friendRequests: { from: requestFromId } },
    })

    if (accept) {
      // Add to friends list for both users
      await User.findByIdAndUpdate(userId, {
        $addToSet: { friends: requestFromId },
      })

      await User.findByIdAndUpdate(requestFromId, {
        $addToSet: { friends: userId },
      })

      return { success: true, message: 'Friend request accepted' }
    } else {
      return { success: true, message: 'Friend request declined' }
    }
  } catch (error) {
    console.error('Error responding to friend request:', error)
    return { success: false, message: 'Failed to respond to friend request' }
  }
}

export async function getFriends(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId).populate('friends', 'firstName lastName')

    if (!user) {
      return { success: false, message: 'User not found' }
    }

    return { success: true, data: user.friends }
  } catch (error) {
    console.error('Error getting friends:', error)
    return { success: false, message: 'Failed to get friends' }
  }
} 