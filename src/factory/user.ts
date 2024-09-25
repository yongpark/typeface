import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

export const UserFactory = new Factory()
    .attrs({
        id: () => faker.string.uuid(),
        email: () => faker.internet.email(),
        name: () => `${faker.person.firstName()} ${faker.person.lastName()}`
    });

export default UserFactory;