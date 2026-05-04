package com.markosiilak.friendcall

import android.telecom.Call
import android.telecom.CallScreeningService
import android.provider.ContactsContract
import android.net.Uri
import android.content.Context

class FriendCallScreeningService : CallScreeningService() {

    override fun onScreenCall(callDetails: Call.Details) {
        val phoneNumber = callDetails.handle?.schemeSpecificPart
        
        if (phoneNumber != null) {
            if (isContact(phoneNumber)) {
                // Number is in contacts, allow the call
                respondToCall(callDetails, CallResponse.Builder().build())
            } else {
                // Number is NOT in contacts, block it
                val response = CallResponse.Builder()
                    .setDisallowCall(true)
                    .setRejectCall(true)
                    .setSkipCallLog(false)
                    .setSkipNotification(true)
                    .build()
                respondToCall(callDetails, response)
            }
        } else {
            // No number? Allow for safety or block based on preference
            respondToCall(callDetails, CallResponse.Builder().build())
        }
    }

    private fun isContact(phoneNumber: String): Boolean {
        val uri = Uri.withAppendedPath(
            ContactsContract.PhoneLookup.CONTENT_FILTER_URI,
            Uri.encode(phoneNumber)
        )
        val projection = arrayOf(ContactsContract.PhoneLookup.DISPLAY_NAME)
        val cursor = contentResolver.query(uri, projection, null, null, null)
        
        return cursor?.use {
            it.count > 0
        } ?: false
    }
}
