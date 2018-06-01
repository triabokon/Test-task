from itertools import combinations


def servers_crush(db):
    """
    Choose servers that will crush and calculate probability
    of loss of at least one shard
    :param db: list with nested lists
    :return: probability of loss of at least one shard
    """
    # combinations of every two servers.
    crushes = list(combinations(list(range(len(db))), 2))

    # find all lost shards
    lost_shards = []
    for i in crushes:
        lost_shards.append(db[i[0]]+db[i[1]])

    # count of all servers that lost at least one shard
    lost_servers = 0
    for i in lost_shards:
        if len(i) > len(set(i)):
            lost_servers += 1

    probability = lost_servers * 100 / len(crushes)
    return probability
