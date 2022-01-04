import { PostProps } from '../entities';
import mock from '../utils/mock';
import { users, posts } from './data';

const user = users[0];

mock.onPost('/api/auth').reply((req) => {
  const { email, password } = JSON.parse(req.data);

  if (user.email !== email || user.password !== password) {
    return [
      400,
      {
        message: 'User not found! Check if your email or password is correct.',
      },
    ];
  }

  return [200, { user }];
});

mock.onPost('/api/auth/token').reply(200, { user });

mock.onGet('/api/user/posts').reply((req) => {
  const { user_id } = req.params;

  const newPosts: PostProps[] = [];

  // eslint-disable-next-line array-callback-return
  posts.map((post) => {
    if (post.author.id === user_id) {
      newPosts.push(post);
    }
  });

  return [200, { posts: newPosts }];
});
