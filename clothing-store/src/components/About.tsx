import image from "../assets/malefemalekid/openart-image_b8nfhTTx_1737652821071_raw__1_-removebg.png";
const AboutPage = () => {
  return (
    <div className="aboutWrapper">
      <h1>About LENION</h1>
      <p>
        Welcome to <strong>LENION</strong>, your ultimate destination for unique
        and stylish clothing. Founded with the vision of redefining fashion, we
        strive to bring you apparel that not only looks great but feels amazing
        to wear.
      </p>
      <p>
        At LENION, we believe that fashion is more than just clothing—it’s an
        expression of your individuality. That’s why our collections are
        thoughtfully designed to cater to diverse styles and personalities.
        Whether you're looking for bold statement pieces or timeless classics,
        LENION has something for everyone.
      </p>
      <p>
        Sustainability is at the core of everything we do. From sourcing
        eco-friendly fabrics to ensuring ethical production practices, we are
        committed to creating a positive impact on both the fashion industry and
        the environment.
      </p>
      <p>
        Thank you for supporting LENION. Together, we can make fashion more
        inclusive, sustainable, and inspiring. Stay stylish and be bold—because
        you deserve nothing less.
      </p>
      <div className="aboutImage">
        <img src={image} alt="LENION Clothing" />
      </div>
    </div>
  );
};

export default AboutPage;
