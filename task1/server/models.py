from server import db

class TV(db.Model):
    __tablename__ = 'tv'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    cost = db.Column(db.Integer)
    screen_size = db.Column(db.Integer)
    clicks = db.Column(db.Integer)

    def __init__(self, title, cost, screen_size, clicks):
        self.title = title
        self.cost = cost
        self.screen_size = screen_size
        self.clicks = clicks

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'cost': self.cost,
            'size': self.screen_size,
            'clicks': self.clicks
        }


class Fridges(db.Model):
    __tablename__ = 'fridges'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    cost = db.Column(db.Integer)
    capacity = db.Column(db.Integer)
    clicks = db.Column(db.Integer)

    def __init__(self, title, cost, capacity, clicks):
        self.title = title
        self.cost = cost
        self.capacity = capacity
        self.clicks = clicks

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'cost': self.cost,
            'size': self.capacity,
            'clicks': self.clicks
        }
