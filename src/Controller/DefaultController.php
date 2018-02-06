<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Users;
use App\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class DefaultController extends Controller
{   
    /**
     * @Route("/", name="home_page")
     */
    public function index()
    {
        $number = mt_rand(0, 100);

        return $this->render('form.html.twig', array(
            'number' => $number,
        ));
    }
     /**
     * @Route("/form", name="user_registration")
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {   
        $user = new Users();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated

            $password =  $user->getPlainPassword();
            $user->setPassword($password);

            // ... perform some action, such as saving the task to the database
            // for example, if Task is a Doctrine entity, save it!
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('index');
        }


        return $this->render('new.html.twig', array(
            'form' => $form->createView(),
        ));
    }

    /**
    * @Route("/lists", name="users_show")
    */
     public function showAction()
    {
        $repository = $this->getDoctrine()->getRepository(Users::class);
        $user = $repository->findAll();

        return $this->render('list.html.twig', array(
            'users' => $user,
        ));

    }
}