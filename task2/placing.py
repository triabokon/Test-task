import random


def chunks(shards, n):
    """
    Yield successive n-sized chunks from l.
    :param shards: list with numbers
    :param n: size of servers
    :return: list with nested lists of n size
    """
    for i in range(0, len(shards), n):
        yield shards[i:i + n]


def unique_check(db):
    """
    Check if there are only one shard in one server.
    :param db: list with nested lists
    :return: if there are only unique elements in nested lists (servers)
    """
    for i in range(len(db)):
        if len(db[i]) > len(set(db[i])):
            return False
    return True


def random_placing(n):
    """
    Random placing of shards on server in database
    It shouldn't be replicas on one server.
    :param n: count of servers
    :return: database: database with mirror placing
    """
    size = (n ** 2) // 2

    shards = [i for i in range(size)]
    replicas = [item for item in shards for i in range(2)]

    while True:
        random.shuffle(replicas)
        database = list(chunks(replicas, n))
        if unique_check(database):
            break

    return database


def mirror_placing(n):
    """
    Mirror placing of shards on server in database
    It should be two equals server with unique shards
    :param n: count of servers
    :return: full_db: database with mirror placing
    """
    size = (n ** 2) // 2
    shards = [i for i in range(size)]

    random.shuffle(shards)

    database = list(chunks(shards, n))
    database = [item for item in database for i in range(2)]

    return database
