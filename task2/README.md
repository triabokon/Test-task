# Task 2
### The Disaster Simulator
CLI Application for calculating probability of lost at least one shard of data from database in case of servers crush

#### Installing
```sh
$ git clone https://github.com/TanyaRyabokon/Test-task.git
$ cd Test-task/task2

```
#### Usage
You should specify n - number of servers and method to place shards on servers. For example:
```sh
$ ./simulate.py -n 10 --random

```
or
```sh
$ ./simulate.py -n 10 --mirror

```
#### Example
![Output](http://res.cloudinary.com/tanyacloud/image/upload/v1527893006/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_%D0%BE%D1%82_2018-06-02_01-33-23_g7rped.png)

