/**
 * @fileOverview FilePaste
 */
define( 'webuploader/runtime/html5/filepaste', [
        'webuploader/base'
    ], function( Base, Html5Runtime ) {

    var $ = Base.$;

    Html5Runtime.register( 'FilePaste', {
        init: function() {
            var me = this,
                opts = me.options,
                elem = $( opts.container );

            elem.on( 'paste', function( e ) {
                var files,
                    triggerFiles = [],
                    acceptStr = [],
                    _tmp = [],
                    len,
                    ii,
                    i;

                e.stopPropagation();
                e.preventDefault();
                e = e.originalEvent || e;
                files = e.clipboardData.items;

                if ( opts.accept && opts.accept.length > 0 ) {
                    for (i = 0, len = opts.accept.length; i < len; i++) {
                        _tmp = opts.accept[i].extensions.split( ',' );
                        for (ii = 0; ii < _tmp.length; ii++) {
                            acceptStr.push(  opts.accept[i].title + '/' + _tmp[ii] );
                        };
                    };
                    acceptStr = acceptStr.join(',');
                }

                for (i = 0, len = files.length; i < len; i++) {
                    if ( acceptStr != '' ) {
                        if ( files[i].type != '' && acceptStr.indexOf( files[i].type ) > -1 ) {
                            triggerFiles.push( files[i].getAsFile() );
                        }
                    } else {
                        triggerFiles.push( files[i].getAsFile() );
                    }

                };

                me.trigger( 'paste', triggerFiles );
            } );
        },

        destroy: function() {
            // todo
        }
    } );

    return FilePaste;
} );