/*exported Johnny5 */
var Johnny5 = function ( configuration ) {
  'use strict';

  var conversation,
    currentQuestion,
    prevQuestion,
    input,
    output,
    userName,
    robotName;

  function printPhrase( phrase, type ) {
    var phraseContainer = document.createElement( 'p' );
    var name;

    if ( type === 'robot' ) {
      name = robotName;
    } else {
      name = userName;
    }

    phraseContainer.className = type;

    var userNameNode = document.createElement( 'span' );
    userNameNode.className = 'name';
    userNameNode.innerHTML = name + ':';

    var phraseNode = document.createElement( 'span' );
    phraseNode.className = 'phrase';
    phraseNode.innerHTML = phrase;

    phraseContainer.appendChild( userNameNode );
    phraseContainer.appendChild( phraseNode );

    output.appendChild( phraseContainer );
    output.scrollTop = output.scrollHeight;
  }

  function getNextQuestion( options, answer ) {
    var nextQuestion;

    for ( var i = 0, l = options.length; i < l; i++ ) {
      var option = options[ i ];
      nextQuestion = options[ i ].goTo;

      if ( ( typeof option.answer === 'function' && option.answer( answer ) ) || option.answer === answer ) {
        break;
      }
    }

    return conversation.questions[ nextQuestion ];
  }

  function processAnswer( question, answer ) {
    var options;

    if ( question.answers ) {
      options = question.answers;
      prevQuestion = question;
    } else {
      options = prevQuestion.answers;
    }

    question = getNextQuestion( options, answer );
    currentQuestion = question;
    printPhrase( currentQuestion.phrase, 'robot' );
  }

  function bindEvents() {
    input.addEventListener( 'keypress', function ( event ) {
      if ( event.keyCode === 13 ) {
        var answer = input.value;
        input.value = '';
        printPhrase( answer, 'user' );
        setTimeout( function () {
          processAnswer( currentQuestion, answer );
        }, 500 );
      }
    } );
  }

  function initialize( configuration ) {
    conversation = configuration.conversation;
    input = configuration.input;
    output = configuration.output;
    currentQuestion = conversation.questions[ conversation.startPhrase ];
    robotName = configuration.robotName;
    userName = configuration.userName;
  }

  function start() {
    printPhrase( currentQuestion.phrase, 'robot' );
    bindEvents();
  }

  initialize( configuration );

  return {
    start: start
  };
};