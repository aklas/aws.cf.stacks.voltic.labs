package cognito;
// package com.volticlabs.liveworks.lambdas;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.CognitoEvent;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
/**
 * Handler for requests to Lambda function.
 */
public class PreSignup implements RequestHandler<CognitoEvent, CognitoEvent> {
    LambdaLogger logger;
    
    public CognitoEvent handleRequest(final CognitoEvent input, final Context context) {
        
    	logger = context.getLogger();
//        logger.log("Ran the PreSignup Trigger!");
    	logger.log("Ran PreSignup Trigger, request of type" + input.getEventType());
        return input;
    }
} 
