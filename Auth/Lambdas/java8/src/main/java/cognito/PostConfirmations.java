package cognito;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
/**
 * Handler for requests to Lambda function.
 */
public class PostConfirmations implements RequestHandler<Object, Object> {
    LambdaLogger logger;
    
    public String handleRequest(final Object input, final Context context) {
        logger = context.getLogger();
        logger.log("Hey Aklas in main Second");
        return "sup";
    }
}
