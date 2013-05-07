from django.db import models
from django.contrib.auth.models import User

class Character(models.Model):
    name = models.CharField(max_length = 50)
    def __unicode__(self):
        return self.name

class ComboType(models.Model):
    name = models.CharField(max_length = 50)
    def __unicode__(self):
        return self.name

class Combo(models.Model):
    name = models.CharField(max_length=200)
    character = models.ForeignKey(Character)
    combo_type = models.ForeignKey(ComboType)
    damage = models.IntegerField(default=0)
    meter_gain = models.IntegerField(default=0)
    meter_drain = models.IntegerField(default=0)
    difficulty = models.IntegerField(default=0)
    creator = models.ForeignKey(User, related_name='creator_combo')
    favorites = models.ManyToManyField(User, related_name='favorited_by') 
    def __unicode__(self):
        return self.name
