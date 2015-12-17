#add this to to your composer.json
composer require oneup/flysystem-bundle: "^1.1",
composer require league/flysystem-dropbox: "^1.0"
composer require dropbox/dropbox-sdk: "^1.1"

#add this to your AppKernel.php
new Oneup\FlysystemBundle\OneupFlysystemBundle(),


#hapus atau buat komentar dengan slash atau hastag ke file vendor/dropbox/dropbox-sdk/lib/Dropbox/RequestUtil.php pada nomor line 19
//if (strlen((string) PHP_INT_MAX) < 19) {
    // Looks like we're running on a 32-bit build of PHP.  This could cause problems because some of the numbers
    // we use (file sizes, quota, etc) can be larger than 32-bit ints can handle.
    //throw new \Exception("The Dropbox SDK uses 64-bit integers, but it looks like we're running on a version of PHP that doesn't support 64-bit integers (PHP_INT_MAX=" . ((string) PHP_INT_MAX) . ").  Library: \"" . __FILE__ . "\"");
//}

#tambahkan ini pada file services pada bundle kerja anda
services:
    acme.dropbox_client:
        class: Dropbox\Client
        arguments:
            - _nRnwFS17AAAAAAAAAAADPn3TpDle6p6QJ4H_0pgK6E7Bzl2p2HwZ51XckUAHTNx #ini adalah token yang digenerate dari dropbox
            - 6lagvo4u0a0sly9  #app key yang terdapat di drop box


#tambahkan ini pada config.yml
oneup_flysystem:
    adapters:
        my_adapter:
            dropbox:
                client: acme.dropbox_client
                prefix: ~
    filesystems:
        product_image_fs:
            adapter:    my_adapter
            mount:      product_image_fs

vich_uploader:
    db_driver: orm
    storage:   flysystem

    mappings:
        product_image:
            uri_prefix:         /images/products
            upload_destination: product_image_fs