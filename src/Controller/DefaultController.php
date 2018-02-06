<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Users;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class DefaultController extends Controller
{
    public function index()
    {
        $number = mt_rand(0, 100);

        return $this->render('form.html.twig', array(
            'number' => $number,
        ));
    }
    public function buildForm()
    {
        $form = $this->createFormBuilder()
            ->add('name', TextType::class)
            ->add('email', TextType::class)
            ->add('password', TextType::class)
            ->add('gender', TextType::class)
            ->add('description', TextType::class)
            ->add('save', SubmitType::class, array('label' => 'Save'))
            ->getForm();

        return $this->render('new.html.twig', array(
            'form' => $form->createView(),
        ));
    }
}