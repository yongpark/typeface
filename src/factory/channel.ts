import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

export const ChannelFactory = new Factory()
    .attrs({
        id: () => faker.string.uuid(),
        name: () => faker.commerce.department(),
        type: () => ChannelType.PUBLIC,
        memberIds: () => [],
        messages: () => []
    });

export default ChannelFactory;