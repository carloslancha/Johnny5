var myConversation = {
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

Johnny5( {
  input: document.getElementById( 'input' ),
  output: document.getElementById( 'output' ),
  conversation: myConversation
} );