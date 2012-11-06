import json
import pymongo
from bson.json_util import dumps

connection = pymongo.Connection("localhost", 27017)
jgol = connection.jgol

class patterns(object):
	def get(self, family, genus):
		cursor = jgol.patterns.find({"family" : family, "genus": genus})
		return dumps(cursor)
		#records = dict((record['_id'], record) for record in cursor)
		#records =  for record in cursor
		return records
	pass