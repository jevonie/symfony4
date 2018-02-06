<?php
namespace App\Form;

use Sonata\AdminBundle\Admin\AbstractAdmin;

class ListView extends AbstractAdmin
{
     protected function configureListFields(ListMapper $listMapper)
        {
            $listMapper
                ->add('title')
                ->add('draft')
            ;
        }
}