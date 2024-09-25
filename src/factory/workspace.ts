import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

export const WorkspaceFactory = new Factory()
    .attrs({
        id: () => faker.string.uuid(),
        name: () => faker.company.name(),
        memberIds: () => [],
        channelIds: () => []
    });

export default WorkspaceFactory;