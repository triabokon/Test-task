import argparse

parser = argparse.ArgumentParser()

parser.add_argument("-n", type=int,
                    help="count of servers")

parser.add_argument("--random", help="set data random", default=False,
                    action="store_true")

parser.add_argument("--mirror", help="set data mirror", default=False,
                    action="store_true")

args = parser.parse_args()
