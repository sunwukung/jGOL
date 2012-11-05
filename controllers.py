import json
import pymongo

connection = pymongo.Connection("localhost", 27017)
jgol = connection.jgol

class patterns(object):
	def get(self, family, genus):
		cursor = jgol.patterns.find({"family" : family, "genus": genus})
		records = dict((record['_id'], record) for record in cursor)

	pass