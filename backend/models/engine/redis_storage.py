import json
from redis import Redis

""" Handles the Memory functions """


class Memory:
    """
    Interacts with Redis server
    """

    def __init__(self, key):
        """
            Intialize the Memory, sets up connection to
            Redis server

        Args:
            key(str): key in which information will be stored in Memory
        """
        self.key = key
        self.connection = Redis()

    def store_info(self, field, information, ttl=None):
        """
            Store information about the field

        Args:
            field(str): Subject Matter
            information(dict): Contains information about Subject matter
            ttl(int): Time in seconds information should live for
        """
        information = json.dumps(information)
        self.connection.hset(self.key, field, information)

        if ttl is not None:
            self.connection.hexpire("weather", ttl, field)

    def get_info(self, field):
        """
            Get the information of the field which
        Args:
            field(str): Subject matter

        Returns:
            weather information
        """
        information = self.connection.hget(self.key, field)
        if information is None:
            return None
        return json.loads(information)
