import { Factory } from 'rosie';
import { faker } from '@faker-js/faker'

export const MessageFactory = new Factory()
    .attrs({
        id: () => faker.string.uuid(),
        content: () => faker.lorem.lines({ min: 1, max: 3 }),
        userId: () => '',
        createdAt: () => faker.date.between({ from: '2024-09-20T00:00:00.000Z', to: '2024-09-23T00:00:00.000Z' })
    });

export default MessageFactory;