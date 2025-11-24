import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  productosService,
  type Producto,
} from "../../services/ecommerce/productos.services";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      if (!id) {
        setError("ID de producto no válido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const productoData = await productosService.obtenerProductoPorId(
          Number(id)
        );
        setProducto(productoData);
      } catch (err) {
        console.error("Error al obtener producto:", err);
        setError("No se pudo cargar el producto. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = () => {
    if (producto) {
      // TODO: Implementar lógica de agregar al carrito
      alert(`Producto "${producto.nombre}" agregado al carrito`);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando detalles del producto...</p>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error || "Producto no encontrado"}</p>
          <hr />
          <button className="btn btn-primary" onClick={handleGoBack}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button
              onClick={handleGoBack}
              className="btn btn-link p-0 text-decoration-none"
            >
              Inicio
            </button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      {/* Detalle del Producto */}
      <div className="row">
        {/* Imagen del Producto */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm">
            <div
              style={{
                height: "500px",
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
              }}
            >
              {!imageError && producto.imagen ? (
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{
                    height: "100%",
                    objectFit: "contain",
                    width: "100%",
                    padding: "20px",
                  }}
                  onError={handleImageError}
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="text-center">
                    <i
                      className="bi bi-image"
                      style={{ fontSize: "4rem", color: "#6c757d" }}
                    ></i>
                    <p className="text-muted mt-2">Sin imagen disponible</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información del Producto */}
        <div className="col-md-6">
          <div className="mb-3">
            <span className="badge bg-info text-capitalize fs-6 mb-2">
              {producto.categoria || "Sin categoría"}
            </span>
          </div>

          <h1 className="display-5 fw-bold mb-3">{producto.nombre}</h1>

          <div className="mb-4">
            <h2 className="text-primary display-4 fw-bold">
              ${producto.precio.toFixed(2)}
            </h2>
          </div>

          <div className="mb-4">
            <h5 className="mb-2">Descripción</h5>
            <p className="text-muted lead">{producto.descripcion}</p>
          </div>

          <div className="mb-4">
            <h5 className="mb-2">Disponibilidad</h5>
            <div className="d-flex align-items-center gap-2">
              {producto.stock > 0 ? (
                <>
                  <span className="badge bg-success fs-6">En stock</span>
                  <span className="text-muted">
                    ({producto.stock} unidades disponibles)
                  </span>
                </>
              ) : (
                <span className="badge bg-danger fs-6">Agotado</span>
              )}
            </div>
          </div>

          <div className="d-grid gap-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
              disabled={producto.stock === 0}
            >
              {producto.stock > 0 ? (
                <>
                  <i className="bi bi-cart-plus me-2"></i>
                  Agregar al carrito
                </>
              ) : (
                "Producto no disponible"
              )}
            </button>
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={handleGoBack}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Volver a la tienda
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-5">
            <div className="card bg-light border-0">
              <div className="card-body">
                <h6 className="card-title fw-bold mb-3">
                  Información del Producto
                </h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <strong>ID:</strong> {producto.id}
                  </li>
                  <li className="mb-2">
                    <strong>Categoría:</strong>{" "}
                    <span className="text-capitalize">
                      {producto.categoria || "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong>Stock:</strong> {producto.stock} unidades
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
