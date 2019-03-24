# Liveworks

Backend AWS Infrastructure for the Auth stack by Voltic Labs Inc.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
sam deploy --template-file packaged.yaml --stack-name aStack --capabilities CAPABILITY_IAM --region us-east-1


### Prerequisites
#### Maven
Be smart and just use [Homebrew](https://brew.sh/) to install Maven using the following command.
```
$ brew install maven
```

To install [Homebrew](https://brew.sh/) see the instruction below.

#### AWS CLI
Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html). The following instruction install the AWS CLI  for macOS using the Bundled Installer.

Download the [AWS CLI Bundled Installer](https://s3.amazonaws.com/aws-cli/awscli-bundle.zip).
```
$ curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
```

Unzip the package.
```
$ unzip awscli-bundle.zip
```

Run the install program.
```
$ sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
```


#### AWS SAM CLI
Download and install [Docker](https://hub.docker.com/editions/community/docker-ce-desktop-mac) for MacOS.

Install [Homebrew](https://brew.sh/) package for MacOS.
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

If you already have [Homebrew](https://brew.sh/) installed upgrade and update the current installation.
```
brew upgrade
brew update
```

Add [Github repo](https://github.com/aws/homebrew-tap) as a brew tap. Using brew tap adds more repos to the list of formulae that brew tracks, updates and installs from.
```
brew tap aws/tap
```

Install the SAM CLI from the brew tap added in previous step.
```
brew install aws-sam-cli
```

The SAM CLI will be installed in the following location:
```
/usr/local/bin/sam
```

Run the following command to verify that the SAM CLI has installed by running the following command:
```
sam --version
```

#### Maven
Will come back to this.



### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Maven](https://maven.apache.org/) - Dependency Management
* [SAM](https://github.com/awslabs/serverless-application-model) - Framework to deploy AWS resources

## Versioning

This project uses [SemVer](http://semver.org/) for versioning. 
<!---
For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
-->

## Authors

* **Aklas Cheema** - *Main author* - [Voltic Labs](https://volticlabs.com/)

<!--
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
-->

## Acknowledgments

* Voltic Labs Inc.

<!--  ******************************************************************************************  -->
## Reminders
* Look into setuping event.json when testing AWS SAM locally. If you forget create an AWS SAM project (nodejs8.10) and have a look at the event.json file and how to use it. See if you can do this Java8 as the runtime.


<!--  ******************************************************************************************  -->
# projTwo

This is a sample template for projTwo - Below is a brief explanation of what we have generated for you:

```bash
├── README.md                                   <-- This instructions file
├── legacy_src                                  <-- Old source code (i.e. Javascript)
├── HelloWorldFunction                          <-- Source for HelloWorldFunction Lambda Function
│   ├── pom.xml                                 <-- Java dependencies
│   └── src
│       ├── main
│       │   └── java
│       │       └── helloworld
│       │           ├── App.java                <-- Lambda function code
│       │           └── GatewayResponse.java    <-- POJO for API Gateway Responses object 
│       └── test                                <-- Unit tests
│           └── java
│               └── helloworld
│                   └── AppTest.java
└── template.yaml
```

## Requirements

* AWS CLI already configured with Administrator permission
* [Java SE Development Kit 8 installed](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [Docker installed](https://www.docker.com/community-edition)
* [Maven](https://maven.apache.org/install.html)

## Setup process

### Installing dependencies

```bash
sam build
```

You can also build on a Lambda like environment by using

```bash
sam build --use-container
```

### Local development

**Invoking function locally through local API Gateway**

```bash
sam local start-api
```

If the previous command ran successfully you should now be able to hit the following local endpoint to invoke your function `http://localhost:3000/hello`

**SAM CLI** is used to emulate both Lambda and API Gateway locally and uses our `template.yaml` to understand how to bootstrap this environment (runtime, where the source code is, etc.) - The following excerpt is what the CLI will read in order to initialize an API and its routes:

```yaml
...
Events:
    HelloWorld:
        Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
        Properties:
            Path: /hello
            Method: get
```

## Packaging and deployment

AWS Lambda Java runtime accepts either a zip file or a standalone JAR file - We use the latter in this example. SAM will use `CodeUri` property to know where to look up for both application and dependencies:

```yaml
...
    HelloWorldFunction:
        Type: AWS::Serverless::Function
        Properties:
            CodeUri: target/HelloWorld-1.0.jar
            Handler: helloworld.App::handleRequest
```

Firstly, we need a `S3 bucket` where we can upload our Lambda functions packaged as ZIP before we deploy anything - If you don't have a S3 bucket to store code artifacts then this is a good time to create one:

```bash
aws s3 mb s3://BUCKET_NAME
```

Next, run the following command to package our Lambda function to S3:

```bash
sam package \
    --output-template-file packaged.yaml \
    --s3-bucket REPLACE_THIS_WITH_YOUR_S3_BUCKET_NAME
```

Next, the following command will create a Cloudformation Stack and deploy your SAM resources.

```bash
sam deploy \
    --template-file packaged.yaml \
    --stack-name projtwo \
    --capabilities CAPABILITY_IAM
```

> **See [Serverless Application Model (SAM) HOWTO Guide](https://github.com/awslabs/serverless-application-model/blob/master/HOWTO.md) for more details in how to get started.**

After deployment is complete you can run the following command to retrieve the API Gateway Endpoint URL:

```bash
aws cloudformation describe-stacks \
    --stack-name projtwo \
    --query 'Stacks[].Outputs'
```

## Testing

We use `JUnit` for testing our code and you can simply run the following command to run our tests:

```bash
cd HelloWorldFunction
mvn test
```

# Appendix

## AWS CLI commands

AWS CLI commands to package, deploy and describe outputs defined within the cloudformation stack:

```bash
sam package \
    --template-file template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket REPLACE_THIS_WITH_YOUR_S3_BUCKET_NAME

sam deploy \
    --template-file packaged.yaml \
    --stack-name projtwo \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides MyParameterSample=MySampleValue

aws cloudformation describe-stacks \
    --stack-name projtwo --query 'Stacks[].Outputs'
```

## Bringing to the next level

Here are a few ideas that you can use to get more acquainted as to how this overall process works:

* Create an additional API resource (e.g. /hello/{proxy+}) and return the name requested through this new path
* Update unit test to capture that
* Package & Deploy

Next, you can use the following resources to know more about beyond hello world samples and how others structure their Serverless applications:

* [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/)
