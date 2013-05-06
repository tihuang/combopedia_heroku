# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'User'
        db.create_table(u'p4u_user', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('email', self.gf('django.db.models.fields.CharField')(default='', max_length=200)),
            ('username', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('password', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal(u'p4u', ['User'])

        # Adding model 'Character'
        db.create_table(u'p4u_character', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal(u'p4u', ['Character'])

        # Adding model 'ComboType'
        db.create_table(u'p4u_combotype', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal(u'p4u', ['ComboType'])

        # Adding model 'Combo'
        db.create_table(u'p4u_combo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('character', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['p4u.Character'])),
            ('combo_type', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['p4u.ComboType'])),
            ('damage', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('meter_gain', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('meter_drain', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('difficulty', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('creator', self.gf('django.db.models.fields.related.ForeignKey')(related_name='creator_combo', to=orm['p4u.User'])),
        ))
        db.send_create_signal(u'p4u', ['Combo'])

        # Adding M2M table for field favorites on 'Combo'
        db.create_table(u'p4u_combo_favorites', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('combo', models.ForeignKey(orm[u'p4u.combo'], null=False)),
            ('user', models.ForeignKey(orm[u'p4u.user'], null=False))
        ))
        db.create_unique(u'p4u_combo_favorites', ['combo_id', 'user_id'])


    def backwards(self, orm):
        # Deleting model 'User'
        db.delete_table(u'p4u_user')

        # Deleting model 'Character'
        db.delete_table(u'p4u_character')

        # Deleting model 'ComboType'
        db.delete_table(u'p4u_combotype')

        # Deleting model 'Combo'
        db.delete_table(u'p4u_combo')

        # Removing M2M table for field favorites on 'Combo'
        db.delete_table('p4u_combo_favorites')


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
            'email': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'username': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        }
    }

    complete_apps = ['p4u']