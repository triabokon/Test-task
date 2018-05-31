#!/usr/bin/env python

from args_parse import args
from placing import random_placing, mirror_placing


def main():
    print(str(args.n))
    print(args.random)
    print(args.mirror)
    print(random_placing(args.n))
    print(mirror_placing(args.n))

if __name__ == "__main__":
    main()
