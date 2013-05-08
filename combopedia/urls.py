from django.conf.urls import patterns, include, url
import settings, os

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'combopedia.views.home', name='home'),
    # url(r'^combopedia/', include('combopedia.foo.urls')),
    url(r'^p4u/$', 'p4u.views.menu', name='menu'),
    url(r'^p4u/create/$', 'p4u.views.create', name='create'),
    url(r'^p4u/view/(?P<combo_id>\d+)/$', 'p4u.views.view_combo', name='view'),
    url(r'^p4u/getallcombos/$', 'p4u.views.get_all_combos', name='getallcombos'),

    url(r'^login/', 'p4u.views.login_user',name='login'),
    url(r'^logout/', 'p4u.views.logout_user',name='logout'),
    url(r'^signup/', 'p4u.views.signup',name='signup'),
    url(r'^p4u/submitCombo/', 'p4u.views.submit_combo',name='submitCombo'),

#    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('',
                        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
                            )
