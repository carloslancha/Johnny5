describe( 'I Robot', function () {

  describe( 'on first question', function () {
    it( 'prints the first phrase in the output', function () {
      initJohnny5();

      lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 0 ].phrase );
    } );

    it( 'prints the expected phrase on allowed answer', function () {
      initJohnny5();

      insertAnswer( 'yes' );

      lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 1 ].phrase );
    } );

    it( 'prints the expected phrase on other allowed answer', function () {
      initJohnny5();

      insertAnswer( 'no' );

      lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 2 ].phrase );
    } );

    it( 'prints the expected phrase on not allowed answer', function () {
      initJohnny5();

      insertAnswer( 'i am your father' );

      lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 6 ].phrase );
    } );
  } );

  describe( 'on not first question', function () {
    it( 'prints the expected phrase on allowed answer', function () {
      initJohnny5();
      insertAnswer( 'no' );

      insertAnswer( 'bah' );

      lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 2 ].phrase );
    } );

    it( 'prints the expected phrase on not allowed answer', function () {
      initJohnny5();
      insertAnswer( 'no' );

      insertAnswer( 'i am your father' );

      lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 3 ].phrase );
    } );
  } );

  it( 'prints the expected phrase if validates the answer with passed callback', function () {
    initJohnny5();
    insertAnswer( 'yes' );

    insertAnswer( 'email' );

    lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 4 ].phrase );
  } );

  it( 'prints the expected phrase if does not alidate the answer with passed callback', function () {
    initJohnny5();
    insertAnswer( 'yes' );

    insertAnswer( 'i am your father' );

    lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 7 ].phrase );
  } );

  beforeEach( function () {
    jasmine.getFixtures().fixturesPath = 'test/fixtures';
    loadFixtures( 'Johnny5.html' );
  } );

  var ANY_INPUT = '#input',
    ANY_OUTPUT = '#output';

  var ANY_CONVERSATION = {
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
  };


  function initJohnny5() {
    Johnny5( {
      input: $( ANY_INPUT )[ 0 ],
      output: $( ANY_OUTPUT )[ 0 ],
      conversation: ANY_CONVERSATION
    } );
  }

  function insertAnswer( answer ) {
    $( ANY_INPUT ).val( answer );
    fireKeyEvent( $( ANY_INPUT )[ 0 ], 'keypress', 13 );
  }

  function fireKeyEvent( el, type, code ) {
    var oEvent = document.createEvent( 'KeyboardEvent' );
    oEvent.initKeyboardEvent( type, true, true, document.defaultView, false, false, false, false, code, code );

    var nEvent = document.createEvent( 'CustomEvent' );
    nEvent.initCustomEvent( type );

    for ( var key in oEvent ) {
      if ( oEvent.hasOwnProperty( key ) ) {
        if ( key === 'keyCode' || key === 'which' ) {
          nEvent[ key ] = code;
        } else {
          nEvent[ key ] = oEvent[ key ];
        }
      }
    }
    el.dispatchEvent( nEvent );
  }

  function lastOutputMessageEqualsTo( question ) {
    expect( $( ANY_OUTPUT + ' p:last-child' ) ).toHaveText( question );
  }

} );