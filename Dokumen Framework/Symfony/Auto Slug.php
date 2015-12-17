<?php
1. In Your Controller
public function autoslugproductAction()
{
    $em = $this->getDoctrine()->getManager();
    $query = $em->getRepository('EntityBundle:Product')->findAll();

    foreach($query as $result)
    {
        $id     = $result->getId();
        $name   = $result->getNama();
        $slug   = $this->get('back.slugger')->slugify($name);

        $entity  = $em->getRepository('EntityBundle:Product')->find($id);
        $entity->setSlug($slug);
        $em->persist($entity);   
    }
    $em->flush();
}

2. In Your Service.yml
services:
    back.slugger:
        class: BackBundle\Utils\Slugger

3. Make A Folder Util and Add This File
<?php
namespace BackBundle\Utils;

class Slugger
{
    public function slugify($string)
    {
        return preg_replace('/[^a-z0-9]/', '-', strtolower(trim(strip_tags($string))));
    }
    
}