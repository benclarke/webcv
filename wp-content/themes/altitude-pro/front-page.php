<?php
/**
 * This file adds the Home Page to the Altitude Pro Theme.
 *
 * @author StudioPress
 * @package Altitude
 * @subpackage Customizations
 */

//* Add custom body class to the head
add_filter( 'body_class', 'altitude_add_body_class' );
function altitude_add_body_class( $classes ) {

   $classes[] = 'altitude-landing';
   return $classes;

}

add_action( 'wp_enqueue_scripts', 'ben_portfolio_scripts' );
function ben_portfolio_scripts() {

	wp_enqueue_script( 'portfolio-modernizer', get_bloginfo( 'stylesheet_directory' ) . '/js/modernizr.custom.js', array( 'jquery' ) );
	wp_enqueue_script( 'portfolio-grid', get_bloginfo( 'stylesheet_directory' ) . '/js/grid.js', array( 'jquery' ), '', true );
	// wp_enqueue_script( 'altitude-script', get_bloginfo( 'stylesheet_directory' ) . '/js/home.js', array( 'jquery' ), '1.0.0' );
	// wp_enqueue_script( 'localScroll', get_stylesheet_directory_uri() . '/js/jquery.localScroll.min.js', array( 'scrollTo' ), '1.2.8b', true );
	// wp_enqueue_script( 'scrollTo', get_stylesheet_directory_uri() . '/js/jquery.scrollTo.min.js', array( 'jquery' ), '1.4.5-beta', true );

	// wp_enqueue_style( 'fontfaces', get_bloginfo( 'stylesheet_directory' ) . '/stylesheets/fontfaces/fontfaces.css' );
	// wp_enqueue_style( 'portfolio-css-component', get_bloginfo( 'stylesheet_directory' ) . '/stylesheets/component.css' );


}


//* Force full width content layout
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

//* Remove site header elements
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );

//* Remove navigation
remove_action( 'genesis_header', 'genesis_do_nav', 12 );
remove_action( 'genesis_header', 'genesis_do_subnav', 5 );
remove_action( 'genesis_footer', 'altitude_footer_menu', 7 );

//* Remove breadcrumbs
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

//* Remove site footer widgets
remove_action( 'genesis_before_footer', 'genesis_footer_widget_areas' );

//* Remove site footer elements
remove_action( 'genesis_footer', 'genesis_footer_markup_open', 5 );
remove_action( 'genesis_footer', 'genesis_do_footer' );
remove_action( 'genesis_footer', 'genesis_footer_markup_close', 15 );

//* Remove breadcrumbs
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

//* Remove the default Genesis loop
remove_action( 'genesis_loop', 'genesis_do_loop' );

//* Add portfolio title and header text
add_action( 'genesis_loop', 'ben_portfolio_header' );

//* Add portfolio widget (circles)
//add_action( 'genesis_loop', 'ben_portfolio_widget' );

//* Add the header again after the grid widget, and turn it upside down
// add_action( 'genesis_after_loop', 'ben_portfolio_header_reversed' );

// Add footer
add_action('genesis_footer', 'ben_portfolio_footer');


function ben_portfolio_bg() {
	echo '<div class="bg-text">google analytics wordpress plugins mailchimp onclick events social media marketing ninjas
	google analytics wordpress plugins mailchimp onclick events social media marketing ninjas
	google analytics wordpress plugins mailchimp onclick events social media marketing ninjas
	google analytics wordpress plugins mailchimp onclick events social media marketing ninjas
	google analytics wordpress plugins mailchimp onclick events social media marketing ninjas
	google analytics wordpress plugins mailchimp onclick events social media marketing ninjas
	</div>';
}

function ben_portfolio_header() {
	echo '<h1 class="portfolio-title">Ben Upham</h1>';
	echo '<p class="portfolio-header">
	<span class="dark ultrabolditalic">I build with ones, zeroes, and most especially, with people.</span>
	<span class="dark bold">How can I be of service?</span>
	You can email me at <a href="mailto:bcupham@gmail.com" class="dark bolditalic">BCUPHAM@&shy;GMAIL&shy;.COM</a>
	and link me in at <a href="http://www.linkedin.com/in/benupham" target="_blank" class="dark bolditalic">in/benupham</a>.
	</p>';
}

function ben_portfolio_header_reversed() {
	echo '<p class="portfolio-header reversed">
	<em>...I’d like to explain:</em> You have to be crazy to keep up with the digital flood, so we must all be crazy.
	<span class="ultrabold">This is my online work experience thing.</span> You can email me at <strong>THIS@BENUPHAM.COM</strong>.
	</p>';
	echo '<h1 class="portfolio-title reversed">Ben Upham</h1>';
}


function ben_portfolio_widget() {

	echo '<div class="container">';
	echo '<ul id="og-grid" class="og-grid">';


	$args = array('post_type' => 'portfolio',
								'posts_per_page' => 999,
								'order' => 'ASC',
								'orderby' => 'meta_value_num',
								'meta_key' => 'portfolio_order'
								);
	$loop = new WP_Query($args);
	while ($loop->have_posts()) : $loop->the_post();

		global $post;

		echo '<li>';

	  $thumb_url = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'portfolio_image_large' );

	  // Check we have the portfolio content
		$my_portfolio_meta = get_post_meta($post->ID);

		$content = get_the_content();
		$externallink = $my_portfolio_meta['weburl'];
		$portfolio_teaser = $my_portfolio_meta['portfolio_teaser'];
		$title = get_the_title();

		echo
		'<a class="portfolio-image clearfix ' . ($externallink != 0 ? 'linked' : 'not-linked' ) . '"' .
		//include the image
		' data-largesrc="' . $thumb_url[0] .
		//include the content
		'" data-description="' .  $content . '"' .
		//inclue the title
		' data-title="' . $title .
		//Add the external url, if any (grid.js handles empties)
		'" href="' . $externallink .'" target="new" >';	//end opening anchor
		the_post_thumbnail('portfolio_image_thumb');
		echo '<div class="portfolio-teaser"><div class="caption regular">';
		if (!empty($portfolio_teaser)) {
			echo $portfolio_teaser[0];
			} else {
				echo $title;
			}
		echo '</div></div></a>'; //end closing anchor

	echo  '</li>';
	endwhile;

	?>
				</ul>
			</div><!-- /container -->
<?php
}

function ben_portfolio_footer() {
	echo '<div class="portfolio-footer"><div class="wrap"><div class="content">
	Built with WordPress Genesis framework. Styles inspired by <a href="https://playbook.cio.gov/designstandards/" target="_blank">the United States government</a>.
	</div></div>';
}

genesis();
