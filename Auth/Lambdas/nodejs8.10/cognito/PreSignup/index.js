;// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let util = require('util');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.lambdaHandler = async (event, context, callback) => {
    console.log(JSON.stringify(event, null, 0));

    /**
     * Step 1
     * Validation Data Check
     * If the required information is in validationData and is correct then proceed to Step 2
     * else deny request to create
     * 
     * This is achieved by applying the validatorSet against validationData
     */
    


    /**
     * Step 2
     * Do entry into service (DynamoDB, RDS, etc...) where you will perform frequent access
     * 
     */

    return event;
};

async function isValid(validationData, context) {
    /**
     * The validatorSet is a set of attributes that map to the attributes in the Cognito User Pool
     * You can then use the validatorSet to validate that the validationData is valid before accepting
     */
    const validatorSet = {
        given_name: {
            dataType: "String",                     //  dataType -> String | Number | DateTime | Boolean; Possible Cognito Attribute datatypes see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SchemaAttributeType.html
            isCustom: false,                        //  indicates if attribute is a custom attribute
            value: null,                            //  the value (of type dataType) associate with key (given_name)
            atomicValidator: (value) => {           //  custom logic to validate associated attribute (given_name)
                return true; 
            }
        },
        family_name: {
            dataType: "String",
            isCustom: false,
            value: null,
            atomicValidator: (value) => {
                return true; 
            }
        },
        about_me: {
            dataType: "String",
            isCustom: true,
            value: null,
            atomicValidator: (value) => {
                return true; 
            }
        },
        signup_date_time: {
            dataType: "DateTime", 
            isCustom: true,
            value: null,
            atomicValidator: (value) => {
                return true; 
            }
        },
        user_type: {
            dataType: "String", 
            isCustom: true, 
            value: null,
            atomicValidator: (value) => { 
                return true; 
            } 
        },
        isNew: {
            dataType: "Boolean", 
            isCustom: true, 
            value: null,
            atomicValidator: (value) => { 
                return true; 
            } 
        },
        height: {
            dataType: "Number", 
            isCustom: true, 
            value: null,
            atomicValidator: (value) => { 
                return true; 
            } 
        }
    }
    
    /**
     * Check validationData contains all required key in validatorSet
     * This (validatorSet) will normally be a set of custom User Pool attributes along with a subset of standard User Pool attributes
     * They may be explicity stated under the read only attributes of the App Client in the CF template
     */
    // const validationDataKeys    = Object.keys(validationData);
    // const validatorSetKeys      = Object.keys(validatorSet);                //  validatorSetKeys is a subset of validationDataKeys

    if (Object.keys(validatorSet).every( key => {
        if (
            (key in validationData)                                     //  check to make sure key exits, notice it will short circuit
            
            &&
            (
                safeTypeGet(validationData[key], null)
            )
            &&
            validatorSet[key].atomicValidator(validationData[key])          //  check that the atomic validator validate the values (returns true)
            
        ) {
            validatorSet[key].value = validationData[key];                  //  bind the value from validationData to validatorSet
            // console.log("TypeMatching_START");
            // console.log(key);
            // console.log(validatorSet[key].dataType.toUpperCase());
            // try{
            //   console.log((typeof JSON.parse(validationData[key])).toUpperCase());
            // }catch(err){
            //   console.log("NO_MATCH");
            // }
            // console.log("TypeMatching_END");
            return true;
        } else {
            
            return false;
        }
        
    })) {
        return validatorSet;
    } else {
        // return null;
        return "Didn't go through"
    }
}

function safeTypeGet(value, type){
  const ISO8601regex = /(\d{4})-(\d{2})-(\d{2})/gm;
  
  if(value === "true" || value === "false") {                   //  check to see if Boolean
    // console.log("BOOLEAN");
    return true;
  }else if(ISO8601regex.test(value) && Date.parse(value)) {     //  check to see if DateTime
    // console.log("DATETIME");
    return true;
  }else if(!isNaN(value)){                                      //  check to see if Number
    // console.log("NUMBER");
    return true;
  }else if(typeof value === "string") {                         //  check to see if String
    // console.log("STRING");
    return true;
  }else {
    // console.log("None at all");
    return
  }
}