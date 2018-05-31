import random

SERVER_SIZE = 4


def chunks(replicas, n):
    """
    Yield successive n-sized chunks from l.
    :param replicas: list with numbers
    :param n: size of servers
    :return: list with nested lists of n size
    """
    for i in range(0, len(replicas), n):
        yield replicas[i:i + n]


def unique_check(db):
    """
    Check if there are only one replica in one server.
    :param db: list with nested lists
    :return: if there are only unique elements in nested lists (servers)
    """
    for i in range(len(db)):
        if len(db[i]) > len(set(db[i])):
            return False
    return True


def random_placing(n):
    """
    Random placing of replicas on server in database
    It shouldn't be two equal replicas on one server.
    :param n: count of servers
    :return: database: database with mirror placing
    """
    size = n * SERVER_SIZE // 2

    replicas = [i for i in range(size)]
    repeated_replicas = [item for item in replicas for i in range(2)]

    while True:
        random.shuffle(repeated_replicas)
        database = list(chunks(repeated_replicas, SERVER_SIZE))
        if unique_check(database):
            break

    return database


def mirror_placing(n):
    """
    Mirror placing of replicas on server in database
    It should be two equals server with unique replicas
    :param n: count of servers
    :return: full_db: database with mirror placing
    """
    size = n * SERVER_SIZE // 2
    replicas = [i for i in range(size)]

    random.shuffle(replicas)
    
    database = list(chunks(replicas, SERVER_SIZE))
    database = [item for item in database for i in range(2)]

    return database
