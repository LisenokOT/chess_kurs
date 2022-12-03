from django.db import models
from django.contrib.auth.models import User


class ChessReiting(models.Model):
    author = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE
    )
    reiting = models.IntegerField()
    
    def __str__(self):
        return str(self.reiting)
    