function Johnny5( configuration ) {
  var conversation,
    currentQuestion,
    prevQuestion,
    input,
    output;

  function printQuestion( question ) {
    var questionNode = document.createElement( 'p' );
    questionNode.innerHTML = question.phrase;
    output.appendChild( questionNode );
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
    printQuestion( currentQuestion );
  }

  function bindEvents() {
    input.addEventListener( 'keypress', function ( event ) {
      if ( event.keyCode == 13 ) {
        var answer = input.value;
        input.value = '';
        processAnswer( currentQuestion, answer );
      }
    } );
  }

  function initialize( configuration ) {
    conversation = configuration.conversation;
    input = configuration.input;
    output = configuration.output;
    currentQuestion = conversation.questions[ conversation.startPhrase ];

    printQuestion( currentQuestion );
    bindEvents();
  }

  initialize( configuration );
}