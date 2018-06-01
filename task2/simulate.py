#!/usr/bin/env python

from args_parse import args
from placing import random_placing, mirror_placing
from disaster import servers_crush


def main():
    db = None
    if args.random:
        db = random_placing(args.n)
    elif args.mirror:
        db = mirror_placing(args.n)
    else:
        print('Please, specify placing method --random or --mirror')

    crashing_probability = servers_crush(db)

    print('Killing 2 arbitrary servers results in data loss in {0}% cases'
          .format(crashing_probability))


if __name__ == "__main__":
    main()
