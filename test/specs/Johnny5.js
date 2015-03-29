/*globals describe, it, expect, beforeEach, jasmine, loadFixtures, Johnny5, $*/
describe( 'I Robot', function () {
  'use strict';

  describe( 'on first question', function () {
    it( 'prints the first robot phrase in the output', function () {
      initJohnny5();

      lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 0 ].phrase );
    } );

    it( 'prints the expected robot phrase on allowed answer', function ( done ) {
      initJohnny5();

      insertAnswer( 'yes' );

      setTimeout( function () {
        lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 1 ].phrase );
        done();
      }, 600 );
    } );

    it( 'prints the expected user phrase on allowed answer', function () {
      initJohnny5();

      insertAnswer( 'yes' );

      lastInputMessageEqualsTo( 'yes' );
    } );

    it( 'prints the expected robot phrase on other allowed answer', function ( done ) {
      initJohnny5();

      insertAnswer( 'no' );

      setTimeout( function () {
        lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 2 ].phrase );
        done();
      }, 600 );
    } );

    it( 'prints the expected robot phrase on not allowed answer', function ( done ) {
      initJohnny5();

      insertAnswer( 'i am your father' );

      setTimeout( function () {
        lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 6 ].phrase );
        done();
      }, 600 );
    } );
  } );

  describe( 'on not first question', function () {
    it( 'prints the expected phrase on allowed answer', function ( done ) {
      initJohnny5();
      insertAnswer( 'no' );

      insertAnswer( 'bah' );

      setTimeout( function () {
        lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 2 ].phrase );
        done();
      }, 600 );
    } );

    it( 'prints the expected phrase on not allowed answer', function ( done ) {
      initJohnny5();
      insertAnswer( 'no' );

      insertAnswer( 'i am your father' );

      setTimeout( function () {
        lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 3 ].phrase );
        done();
      }, 600 );
    } );
  } );

  it( 'prints the expected phrase if validates the answer with passed callback', function ( done ) {
    initJohnny5();
    insertAnswer( 'yes' );

    insertAnswer( 'email' );

    setTimeout( function () {
      lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 4 ].phrase );
      done();
    }, 600 );
  } );

  it( 'prints the expected phrase if does not alidate the answer with passed callback', function ( done ) {
    initJohnny5();
    insertAnswer( 'yes' );

    insertAnswer( 'i am your father' );

    setTimeout( function () {
      lastOutputMessageEqualsTo( ANY_CONVERSATION.questions[ 7 ].phrase );
      done();
    }, 600 );
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
    var myJohnny5 = new Johnny5( {
      input: $( ANY_INPUT )[ 0 ],
      output: $( ANY_OUTPUT )[ 0 ],
      conversation: ANY_CONVERSATION
    } );
    myJohnny5.start();
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

  function lastOutputMessageEqualsTo( phrase ) {
    var robotMessages = $( ANY_OUTPUT + ' p.robot' );
    expect( $( robotMessages )[ robotMessages.length - 1 ] ).toHaveText( phrase );
  }

  function lastInputMessageEqualsTo( phrase ) {
    var userMessages = $( ANY_OUTPUT + ' p.user' );
    expect( $( userMessages )[ userMessages.length - 1 ] ).toHaveText( phrase );
  }

} );