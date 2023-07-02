CREATE TABLE Bug (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    creator VARCHAR(100) NOT NULL,
    collaborators TEXT,
    startDateTime datetime NOT NULL,
    endDateTime datetime,
    lastModified datetime,																																									
    status INT NOT NULL,
    linkedbugs TEXT NOT NULL
);
