import { Prisma } from "@prisma/client"
import { AdminReview } from "./types/type";

type MenuItemReviewWithRelations =
  Prisma.MenuItemReviewGetPayload<{
    include: {
      user: {
        select: {
          id: true;
          name: true;
          email: true;
        };
      };

      menuItem: {
        select: {
          id: true;
          title: true;
          images: {
            take: 1;
            select: {
              url: true;
            };
          };
        };
      };
    };
  }>;

type PackageReviewWithRelations =
  Prisma.PackageReviewGetPayload<{
    include: {
      user: {
        select: {
          id: true;
          name: true;
          email: true;
        };
      };
      package: {
        select: {
          id: true;
          name: true;
          image: true;
        };
      };
    };
  }>;

type EventReviewWithRelations =
  Prisma.EventReviewGetPayload<{
    include: {
      user: {
        select: {
          id: true;
          name: true;
          email: true;
        };
      };
      event: {
        select: {
          id: true;
          name: true;
          image: true;
        };
      };
    };
  }>;

type HamperReviewWithRelations =
  Prisma.HamperReviewGetPayload<{
    include: {
      user: {
        select: {
          id: true;
          name: true;
          email: true;
        };
      };
      hamper: {
        select: {
          id: true;
          name: true;
          image: true;
        };
      };
    };
  }>;

export function normalizeMenuItemReview(
  review: MenuItemReviewWithRelations
): AdminReview {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,

    type: "MENU_ITEM",

    customer: {
      id: review.user.id,
      name: review.user.name,
      email: review.user.email,
    },

    product: {
      id: review.menuItem.id,
      name: review.menuItem.title,
      image: review.menuItem.images[0]?.url ?? null,
    },
  };
}

export function normalizePackageReview(
  review: PackageReviewWithRelations
): AdminReview {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,

    type: "PACKAGE",

    customer: {
      id: review.user.id,
      name: review.user.name,
      email: review.user.email,
    },

    product: {
      id: review.package.id,
      name: review.package.name,
      image: review.package.image ?? null,
    },
  };
}

export function normalizeEventReview(
  review: EventReviewWithRelations
): AdminReview {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,

    type: "EVENT",

    customer: {
      id: review.user.id,
      name: review.user.name,
      email: review.user.email,
    },

    product: {
      id: review.event.id,
      name: review.event.name,
      image: review.event.image ?? null,
    },
  };
}

export function normalizeHamperReview(
  review: HamperReviewWithRelations
): AdminReview {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,

    type: "HAMPER",

    customer: {
      id: review.user.id,
      name: review.user.name,
      email: review.user.email,
    },

    product: {
      id: review.hamper.id,
      name: review.hamper.name,
      image: review.hamper.image ?? null,
    },
  };
}