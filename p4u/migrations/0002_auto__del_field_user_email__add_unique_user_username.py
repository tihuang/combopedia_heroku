# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'User.email'
        db.delete_column(u'p4u_user', 'email')

        # Adding unique constraint on 'User', fields ['username']
        db.create_unique(u'p4u_user', ['username'])


    def backwards(self, orm):
        # Removing unique constraint on 'User', fields ['username']
        db.delete_unique(u'p4u_user', ['username'])

        # Adding field 'User.email'
        db.add_column(u'p4u_user', 'email',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=200),
                      keep_default=False)


    models = {
        u'p4u.character': {
            'Meta': {'object_name': 'Character'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'p4u.combo': {
            'Meta': {'object_name': 'Combo'},
            'character': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['p4u.Character']"}),
            'combo_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['p4u.ComboType']"}),
            'creator': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'creator_combo'", 'to': u"orm['p4u.User']"}),
            'damage': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'difficulty': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'favorites': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'favorited_by'", 'symmetrical': 'False', 'to': u"orm['p4u.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'meter_drain': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'meter_gain': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        u'p4u.combotype': {
            'Meta': {'object_name': 'ComboType'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'p4u.user': {
            'Meta': {'object_name': 'User'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '200'})
        }
    }

    complete_apps = ['p4u']