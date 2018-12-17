import {
    ErrorHandler,
    HandlerInput,
    RequestHandler,
    SkillBuilders,
  } from 'ask-sdk-core';
  import {
    Response,
    SessionEndedRequest,
  } from 'ask-sdk-model';
  
  const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
      const speechText = 'Hi there.  Ask me to tell a joke!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Alexa Jokes', speechText)
        .getResponse();
    },
  };
  
  const HelloWorldIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'TellJokeIntent';
    },
    handle(handlerInput: HandlerInput): Response {
      const speechText = 'This is where I should tell a joke';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Alexa Jokes', speechText)
        .getResponse();
    },
  };
  
  const HelpIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput: HandlerInput): Response {
      const speechText = 'You can ask me to tell a joke.';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('Alexa Jokes', speechText)
        .getResponse();
    },
  };
  
  const CancelAndStopIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
          || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput: HandlerInput): Response {
      const speechText = 'Goodbye!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Alexa Jokes', speechText)
        .getResponse();
    },
  };
  
  const SessionEndedRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput: HandlerInput): Response {
      console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`);
  
      return handlerInput.responseBuilder.getResponse();
    },
  };
  
  const ErrorHandler: ErrorHandler = {
    canHandle(handlerInput: HandlerInput, error: Error ): boolean {
      return true;
    },
    handle(handlerInput: HandlerInput, error: Error): Response {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak('Sorry, I can\'t understand the command. Please say again.')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
        .getResponse();
    },
  };
  
  exports.handler = SkillBuilders.custom()
    .addRequestHandlers(
      LaunchRequestHandler,
      HelloWorldIntentHandler,
      HelpIntentHandler,
      CancelAndStopIntentHandler,
      SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
  