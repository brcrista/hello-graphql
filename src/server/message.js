const messages = [{ content: "Take it easy", author: "Brian" }];

export function createMessage({ message }) {
    const newLength = messages.push(message);
    return { id: newLength - 1, ...message };
}

export function getMessage({ id }) {
    return messages[id] || null;
}

export function updateMessage({ id, message }) {
    if (messages[id] === undefined) {
        return null;
    }

    messages[id] = message;
    return { id, ...message };
}
