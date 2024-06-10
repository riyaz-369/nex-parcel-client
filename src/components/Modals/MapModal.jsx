import { RxCross2 } from "react-icons/rx";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import Container from "../Shared/Container";

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
    map.invalidateSize();
  }, [map, center]);

  return null;
};

const MapModal = ({ isOpen, setIsOpen, delivery }) => {
  const { delivery_address_latitude, delivery_address_longitude } = delivery;
  const center = [delivery_address_latitude, delivery_address_longitude];

  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-base-200 p-6 shadow-xl transition-all">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Delivery Address Location Point
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-2xl btn btn-sm rounded-full btn-outline hover:bg-[#F43F5E] border-none"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                  {/* MAP */}
                  <div className="w-full h-[500px]">
                    <MapContainer
                      center={center}
                      zoom={13}
                      scrollWheelZoom={true}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='<a href=""></a>'
                      />
                      <Marker position={center}>
                        <Popup></Popup>
                      </Marker>
                      <MapUpdater center={center} />
                    </MapContainer>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MapModal;
