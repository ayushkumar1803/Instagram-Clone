export function seedDatabase(firebase) {
    const users = [
      {
        userId: 'u6GkFhBxvVVV3ubYNQZLHqLexqn2',
        username: 'theayushkumar',
        fullName: 'Ayush Kumar',
        emailAddress: 'ayushkumarmnp2001@gmail.com',
        following: ['2','3','4'],
        followers: [],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'karthik',
        fullName: 'Karthik Gupta',
        emailAddress: 'karthik1201@gmail.com',
        following: [],
        followers: ['u6GkFhBxvVVV3ubYNQZLHqLexqn2'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'mahi',
        fullName: 'Mahendra Singh',
        emailAddress: 'mahendra@singh.com',
        following: [],
        followers: ['u6GkFhBxvVVV3ubYNQZLHqLexqn2'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'vkaushal',
        fullName: 'Vikky Kaushal',
        emailAddress: 'vkaus21@outlook.com',
        following: [],
        followers: ['u6GkFhBxvVVV3ubYNQZLHqLexqn2'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection('users').add(users[k]);
    }
  
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '2',
          imageSrc: `/images/users/${i}.jpg`,
          caption: 'Saint George and the Dragon',
          likes: [],
          comments: [
            {
              displayName: 'mahi',
              comment: 'Love this place, looks like my animal farm!'
            },
            {
              displayName: 'vkaushal',
              comment: 'Would you mind if I used this picture?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
  }