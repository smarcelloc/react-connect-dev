import faker from 'faker';
import moment from 'moment';

import {
  NotificationProps,
  PostProps,
  TagsProps,
  UserProps,
} from '../entities';
import contentMarkdown from './content';

const maxGenerate = {
  users: 5,
  tags: 10,
  posts: 25,
};

const imageAvatar = [
  require('../assets/img/avatar/02.jpg'),
  require('../assets/img/avatar/03.jpg'),
  require('../assets/img/avatar/04.jpg'),
  require('../assets/img/avatar/05.jpg'),
  require('../assets/img/avatar/06.jpg'),
  require('../assets/img/avatar/07.jpg'),
];
const imagePost = [
  require('../assets/img/post/01.webp'),
  require('../assets/img/post/02.webp'),
  require('../assets/img/post/03.webp'),
  require('../assets/img/post/04.webp'),
  require('../assets/img/post/05.webp'),
  require('../assets/img/post/06.webp'),
  require('../assets/img/post/07.webp'),
];

const users: UserProps[] = [];

const userCurrent: UserProps = {
  id: '52fd2a40-f9ae-4ea5-90c6-ed4cf427d199',
  name: 'John Joe',
  username: 'johnjoe12',
  email: 'john@example.com',
  password: 'password@123',
  avatar: require('../assets/img/avatar/01.jpg'),
  joinedIn: 1622052975275,
  work: 'Software developer',
  totalPost: 30,
};

users.push(userCurrent);

for (let i = 0; i < maxGenerate.users; i++) {
  users.push({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    username: faker.unique(faker.internet.userName),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    avatar: faker.random.arrayElement(imageAvatar),
    bio: faker.lorem.paragraph(),
    joinedIn: moment()
      .subtract(faker.datatype.number({ min: 30, max: 1000 }), 'days')
      .toDate()
      .getTime(),
    work: faker.company.companyName(),
    totalPost: faker.datatype.number({ min: 1, max: 100 }),
  });
}

const tags: TagsProps[] = [];
for (let i = 0; i < maxGenerate.tags; i++) {
  tags.push({
    id: faker.datatype.uuid(),
    title: faker.unique(faker.git.branch),
  });
}

const posts: PostProps[] = [];
for (let i = 0; i < maxGenerate.posts; i++) {
  posts.push({
    id: faker.datatype.uuid(),
    title: faker.lorem.sentences(1),
    image: faker.random.arrayElement(imagePost),
    content: contentMarkdown,
    author: faker.random.arrayElement(users),
    time: moment()
      .subtract(faker.datatype.number({ min: 1, max: 370 }), 'days')
      .toDate()
      .getTime(),
    isFavorite: faker.datatype.boolean(),
    tags: faker.random.arrayElements(tags),
  });
}

const notifications: NotificationProps[] = [
  {
    id: '5e8883f1b51cc1956a5a1ec0',
    title: 'New ratings received',
    description: 'You received 1 new review',
    type: 'reviews',
    createdAt: moment().subtract(2, 'hours').toDate().getTime(),
  },
  {
    id: '5e8883f7ed1486d665d8be1e',
    title: 'New comments received',
    description: 'You received 1 new comment',
    type: 'new_comment',
    createdAt: moment().subtract(1, 'day').toDate().getTime(),
  },
  {
    id: '5e8883fca0e8612044248ecf',
    title: 'New likes received',
    description: 'You received 1 new like',
    type: 'like',
    createdAt: moment().subtract(3, 'days').toDate().getTime(),
  },
  {
    id: '5e8883fca4e8612045278ecf',
    title: 'New followers',
    description: '2 devs started following you',
    type: 'connection',
    createdAt: moment().subtract(3, 'days').toDate().getTime(),
  },
];

export { users, notifications, tags, posts, userCurrent };
