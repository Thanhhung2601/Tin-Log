const conversation = [
    {
        id: '1',
        members: ['62ce33ad995da3d6f821e966', '62ce33a8995da3d6f821e963'],
    },
    {
        id: '2',
        members: ['62ce33a8995da3d6f821e963', '62ce33ad995da3d6f821e966'],
    },
    {
        id: '3',
        members: ['62ce33a8995da3d6f821e963', '62ce33a2995da3d6f821e960'],
    },
    {
        id: '4',
        members: ['62ce33a2995da3d6f821e960', '62ce33ad995da3d6f821e966'],
    },
    {
        id: '5',
        members: ['62ce33a2995da3d6f821e960', '62ce33a8995da3d6f821e963'],
    },
    {
        id: '6',
        members: ['62ce33ad995da3d6f821e966', '62ce33a2995da3d6f821e960'],
    },
]
const data = []

for (let index = 0; index < conversation.length - 1; index++) {
    for (let index2 = index + 1; index2 < conversation.length; index2++) {
        if (
            conversation[index].members[0] == conversation[index2].members[1] &&
            conversation[index].members[1] == conversation[index2].members[0]
        ) {
            data.push(conversation[index])
        }
    }
}

console.log(data)
