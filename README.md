# Johnny5
<img src=johnny5.jpg/>
> Johnny5 is a conversational robot based in the conversation system of the clasic graphic adventure or conversational games.
> The idea is pretty simple, Johnny5 asks you a question, you answer him and then Johnny5 answers you. On the Real World™ we call it "conversation".


## Getting started

You just need to instantiate Johnny5 function with the configuration of your conversation. To run it you need to run the method start.

```js
var myJohnny5 = Johnny5(myConfig);
myJohnny5.start();
```
### Configuration

#### input
Type: `DOM element`

The input element where the users will write their answers.

#### output
Type: `DOM element`

The output element where Johnny5 will prints her phrases.

#### robotName
Type: `String`

The name of the robot. Will be printed in his chat messages.

#### userName
Type: `String`

The name of the user. Will be printed in his chat messages.

#### conversation
Type: `Object`

The conversation screenplay.

#### conversation.startPhrase
Type: `String`

The first question id. Johnny5 will start the conversation with that question.

#### conversation.questions
Type: `Object`

The object with the questions.

#### conversation.questions[questionId]
Type: `Object`

A question configuration object.

#### conversation.questions[questionId].phrase
Type: `String|Array`

The phrase of the question. If is an array will gets randomly one of the phrases.

#### conversation.questions[questionId].answers
Type: `Array`

List of posibles answers.

#### conversation.questions[questionId].answers[answer]
Type: `Object`

Answer configuration object.

#### conversation.questions[questionId].answers[answer].answer
Type: `String | Function | Undefined`

The possible answer or, if a function, the validation function of the answer. Must return a `Boolean`

If is not defined will be used as default answer for the question.

#### conversation.questions[questionId].answers[answer].goTo
Type: `String`

Id of the `conversation.questions` that Johnny5 will ask after the answer.


### Sample of use

```js
var myJohnny5 = new Johnny5( {
    input: document.getElementById('input'),
    output: document.getElementById('output'),
    robotName: 'Johnny 5',
    userName: 'You',
    conversation: {
        startPhrase: 0,
        questions: {
          0: {
            phrase: 'Hi there! Do you want to register?',
            answers: [ {
              answer: 'yes',
              goTo: 1
            }, {
              answer: 'no',
              goTo: 2
            }, {
              goTo: 6
            } ]
          },

          1: {
            phrase: 'Great! Write your email!',
            answers: [ {
              answer: function ( input ) {
                return input === 'email';
              },
              goTo: 4
            }, {
              goTo: 7
            } ]
          },

          2: {
                phrase: 'What a pitty! Let me know if you change your mind',
            answers: [ {
              answer: 'bah',
              goTo: 2
            }, {
              goTo: 3
            } ]
          },

          3: {
            phrase: 'Hey! Do you change your mind?',
            answers: [ {
              answer: 'yes',
              goTo: 1
            }, {
              answer: 'no',
              goTo: 2
            }, {
              goTo: 6
            } ]
          },

          4: {
            phrase: 'Perfect! We got you!',
            answers: [ {
              goTo: 5
            } ]
          },

          5: {
            phrase: 'My job is done here. Have a nice day!',
            answers: [ {
              goTo: 5
            } ]
          },

          6: {
            phrase: 'Sorry, I cant understand you. Try again with just yes or no.'
          },

          7: {
            phrase: 'Please, enter a valid email address'
          }
        }
    }
});

myJohnny5.start();
```

### Demo

You can check a live demo <a href="http://carloslancha.github.io/johnny5/">here</a>.