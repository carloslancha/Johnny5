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

  function scrollDown( node ) {
    node.scrollTop = node.scrollHeight;
  }

  function createNode( type, className, content ) {
    var node = document.createElement( type );
    node.className = className;
    node.innerHTML = content;
    return node;
  }

  function printPhrase( phrase, type ) {
    var name;

    if ( type === 'robot' ) {
      name = robotName;
    } else {
      name = userName;
    }

    var userNameNode = createNode( 'span', 'name', name + ':' );
    var phraseNode = createNode( 'span', 'phrase', phrase );
    var phraseContainer = createNode( 'p', type );

    phraseContainer.appendChild( userNameNode );
    phraseContainer.appendChild( phraseNode );

    output.appendChild( phraseContainer );

    scrollDown( output );
  }

  function isFunctiondAndTrue( func, params ) {
    return typeof func === 'function' && func( params );
  }

  function answerIsCorrect( expected, actual ) {
    return expected === actual;
  }

  function getNextQuestion( options, answer ) {
    var nextQuestion;

    for ( var i = 0, l = options.length; i < l; i++ ) {
      var option = options[ i ];
      nextQuestion = options[ i ].goTo;

      if ( isFunctiondAndTrue( option.answer, answer ) || answerIsCorrect( option.answer, answer ) ) {
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

  function isEnterKey( key ) {
    return key === 13;
  }

  function resetInput() {
    input.value = '';
  }

  function simulateThinking( answer ) {
    setTimeout( function () {
      processAnswer( currentQuestion, answer );
    }, 500 );
  }

  function bindEvents() {
    input.addEventListener( 'keypress', function ( event ) {
      if ( isEnterKey( event.keyCode ) ) {
        var answer = input.value;

        resetInput();
        printPhrase( answer, 'user' );

        simulateThinking( answer );
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