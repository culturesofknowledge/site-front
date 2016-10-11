__author__ = 'sers0034'

import redis

import indexer
import redisconfig

red_temp = redis.Redis(host=redisconfig.host, db=redisconfig.db_temp_cofk_create)

indexer.StoreRelations( ["comments","images","institutions","locations","manifestations","people","resources","works"], red_temp )